const https = require('https');
const fs = require('fs');
const path = require('path');

// Load credentials from PAM
const MGMT_TOKEN = require('child_process')
  .execSync('openssl enc -aes-256-cbc -d -pbkdf2 -in ~/.manus_credentials/contentful_mgmt_token.enc -pass pass:"$(hostname)-$(whoami)-manus-secure-2025"')
  .toString().trim();

const SPACE_ID = 'yl1mk6fxklfe';
const ENVIRONMENT = 'master';

// Helper function to make HTTPS requests
function makeRequest(method, path, data = null, version = null, contentType = null) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Authorization': `Bearer ${MGMT_TOKEN}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
    };
    
    if (version) {
      headers['X-Contentful-Version'] = version;
    }
    
    if (contentType) {
      headers['X-Contentful-Content-Type'] = contentType;
    }
    
    const options = {
      hostname: 'api.contentful.com',
      port: 443,
      path: path,
      method: method,
      headers: headers
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : {});
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Helper function to upload binary file
function uploadBinary(filePath) {
  return new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(filePath);
    
    const options = {
      hostname: 'upload.contentful.com',
      port: 443,
      path: `/spaces/${SPACE_ID}/uploads`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MGMT_TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : {});
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileBuffer);
    req.end();
  });
}

// Helper function to upload asset
async function uploadAsset(filePath, title, description) {
  console.log(`Uploading ${title}...`);
  
  const fileName = path.basename(filePath);
  const contentType = fileName.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
  
  // Step 1: Upload binary
  const upload = await uploadBinary(filePath);
  
  // Step 2: Create asset
  const asset = await makeRequest('POST', `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets`, {
    fields: {
      title: { 'en-US': title },
      description: { 'en-US': description },
      file: {
        'en-US': {
          contentType: contentType,
          fileName: fileName,
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: upload.sys.id
            }
          }
        }
      }
    }
  });
  
  // Step 3: Process asset
  const processPath = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets/${asset.sys.id}/files/en-US/process`;
  await makeRequest('PUT', processPath, {}, asset.sys.version);
  
  // Wait for processing
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Step 4: Get processed asset and publish
  const processedAsset = await makeRequest('GET', `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets/${asset.sys.id}`);
  const publishPath = `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets/${asset.sys.id}/published`;
  await makeRequest('PUT', publishPath, {}, processedAsset.sys.version);
  
  console.log(`✅ Uploaded and published: ${title} (ID: ${asset.sys.id})`);
  return asset.sys.id;
}

async function main() {
  try {
    console.log('🚀 Starting About Page & Team CMS Setup...\n');
    
    // Step 1: Update aboutPageContent content type
    console.log('Step 1: Checking aboutPageContent content type...');
    
    const aboutContentType = await makeRequest('GET', `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/content_types/aboutPageContent`);
    
    // Check if Hero_Image field already exists
    const hasHeroImage = aboutContentType.fields.some(f => f.id === 'Hero_Image');
    
    if (!hasHeroImage) {
      console.log('  Adding Hero_Image fields...');
      
      aboutContentType.fields.push({
        id: 'Hero_Image',
        name: 'Hero Image',
        type: 'Link',
        linkType: 'Asset',
        required: false
      });
      
      aboutContentType.fields.push({
        id: 'Hero_Image_Alt_Text',
        name: 'Hero Image Alt Text',
        type: 'Symbol',
        required: false
      });
      
      const updated = await makeRequest(
        'PUT',
        `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/content_types/aboutPageContent`,
        aboutContentType,
        aboutContentType.sys.version
      );
      
      // Publish content type
      await makeRequest(
        'PUT',
        `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/content_types/aboutPageContent/published`,
        {},
        updated.sys.version
      );
      
      console.log('✅ Updated aboutPageContent content type\n');
    } else {
      console.log('✅ Hero_Image field already exists\n');
    }
    
    // Step 2: Create teamMember content type
    console.log('Step 2: Creating teamMember content type...');
    
    try {
      const teamMemberContentType = {
        name: 'Team Member',
        displayField: 'Name',
        fields: [
          {
            id: 'Title',
            name: 'Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'Name',
            name: 'Name',
            type: 'Symbol',
            required: true
          },
          {
            id: 'Role',
            name: 'Role',
            type: 'Symbol',
            required: true
          },
          {
            id: 'Bio',
            name: 'Bio',
            type: 'Text',
            required: true
          },
          {
            id: 'Avatar',
            name: 'Avatar',
            type: 'Link',
            linkType: 'Asset',
            required: true
          },
          {
            id: 'Order',
            name: 'Order',
            type: 'Integer',
            required: true
          }
        ]
      };
      
      const createdTeamMemberType = await makeRequest(
        'PUT',
        `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/content_types/teamMember`,
        teamMemberContentType
      );
      
      // Publish content type
      await makeRequest(
        'PUT',
        `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/content_types/teamMember/published`,
        {},
        createdTeamMemberType.sys.version
      );
      
      console.log('✅ Created and published teamMember content type\n');
    } catch (error) {
      if (error.message.includes('VersionMismatch') || error.message.includes('already exists')) {
        console.log('✅ teamMember content type already exists\n');
      } else {
        throw error;
      }
    }
    
    // Step 3: Upload images
    console.log('Step 3: Uploading images...\n');
    
    const heroImageId = await uploadAsset(
      '/home/ubuntu/SerenityTidesWebsite/generated_images/about_hero_solo_yoga_calm_waves.jpg',
      'About Page Hero - Solo Yoga in Calm Waves',
      'Person practicing yoga on serene beach at golden hour with calm waves'
    );
    
    const erikImageId = await uploadAsset(
      '/home/ubuntu/SerenityTidesWebsite/generated_images/team_erik.jpg',
      'Erik Beitel - Founder & Lead Instructor',
      'Professional headshot of Erik Beitel'
    );
    
    const juliaImageId = await uploadAsset(
      '/home/ubuntu/SerenityTidesWebsite/generated_images/team_julia.jpg',
      'Julia Fetty - Yoga & Movement Specialist',
      'Professional headshot of Julia Fetty'
    );
    
    const amandaImageId = await uploadAsset(
      '/home/ubuntu/SerenityTidesWebsite/generated_images/team_amanda.jpg',
      'Amanda LeVine - Community Manager',
      'Professional headshot of Amanda LeVine'
    );
    
    const isabelImageId = await uploadAsset(
      '/home/ubuntu/SerenityTidesWebsite/generated_images/team_isabel.jpg',
      'Isabel Fudali - Mindfulness Coach',
      'Professional headshot of Isabel Fudali'
    );
    
    const drewImageId = await uploadAsset(
      '/home/ubuntu/SerenityTidesWebsite/generated_images/team_drew.jpg',
      'Drew Schuratz - Creative Director',
      'Professional headshot of Drew Schuratz'
    );
    
    console.log('\n✅ All images uploaded!\n');
    
    // Step 4: Update About Page Content entry with hero image
    console.log('Step 4: Updating About Page Content entry...');
    
    const aboutEntry = await makeRequest('GET', `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/4ggue1PTv0yXffip466vY2`);
    
    aboutEntry.fields.Hero_Image = {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: heroImageId
        }
      }
    };
    
    aboutEntry.fields.Hero_Image_Alt_Text = {
      'en-US': 'Solo practitioner doing yoga pose on calm ocean beach at sunrise'
    };
    
    const updatedEntry = await makeRequest(
      'PUT',
      `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/4ggue1PTv0yXffip466vY2`,
      aboutEntry,
      aboutEntry.sys.version
    );
    
    // Publish entry
    await makeRequest(
      'PUT',
      `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/4ggue1PTv0yXffip466vY2/published`,
      {},
      updatedEntry.sys.version
    );
    
    console.log('✅ Updated About Page Content entry\n');
    
    // Step 5: Create team member entries
    console.log('Step 5: Creating team member entries...\n');
    
    const teamMembers = [
      {
        name: 'Erik Beitel',
        role: 'Founder & Lead Instructor',
        bio: 'Erik founded Serenity Tides with a vision of bringing mindful practices to urban communities. With over 10 years of experience in yoga and meditation, he creates welcoming spaces for all practitioners.',
        avatarId: erikImageId,
        order: 1
      },
      {
        name: 'Julia Fetty',
        role: 'Yoga & Movement Specialist',
        bio: 'Julia brings a dynamic approach to movement, blending traditional yoga with modern fitness techniques. Her classes are known for their inclusive atmosphere and creative sequences.',
        avatarId: juliaImageId,
        order: 2
      },
      {
        name: 'Amanda LeVine',
        role: 'Community Manager',
        bio: 'Amanda ensures our community feels connected and supported. She coordinates events, manages communications, and helps create the warm, welcoming environment Serenity Tides is known for.',
        avatarId: amandaImageId,
        order: 3
      },
      {
        name: 'Isabel Fudali',
        role: 'Mindfulness Coach',
        bio: 'Isabel specializes in meditation and mindfulness practices. Her gentle guidance helps participants develop sustainable daily practices for stress reduction and mental clarity.',
        avatarId: isabelImageId,
        order: 4
      },
      {
        name: 'Drew Schuratz',
        role: 'Creative Director',
        bio: 'Drew brings artistic vision to our events and communications. He ensures that every aspect of the Serenity Tides experience reflects our values of beauty, authenticity, and connection.',
        avatarId: drewImageId,
        order: 5
      }
    ];
    
    for (const member of teamMembers) {
      const entry = await makeRequest('POST', `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`, {
        fields: {
          Title: { 'en-US': member.name },
          Name: { 'en-US': member.name },
          Role: { 'en-US': member.role },
          Bio: { 'en-US': member.bio },
          Avatar: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: member.avatarId
              }
            }
          },
          Order: { 'en-US': member.order }
        }
      }, null, 'teamMember');
      
      // Set content type header for the update
      entry.sys.contentType = {
        sys: {
          type: 'Link',
          linkType: 'ContentType',
          id: 'teamMember'
        }
      };
      
      const updatedMember = await makeRequest(
        'PUT',
        `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${entry.sys.id}`,
        entry,
        entry.sys.version
      );
      
      // Publish entry
      await makeRequest(
        'PUT',
        `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${entry.sys.id}/published`,
        {},
        updatedMember.sys.version
      );
      
      console.log(`✅ Created team member: ${member.name}`);
    }
    
    console.log('\n🎉 Setup complete!');
    console.log('\nSummary:');
    console.log('- Updated aboutPageContent content type with Hero_Image fields');
    console.log('- Created teamMember content type');
    console.log('- Uploaded 6 images (1 hero + 5 team members)');
    console.log('- Updated About Page Content entry with hero image');
    console.log('- Created 5 team member entries');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();


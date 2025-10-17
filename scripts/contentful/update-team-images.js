const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

const token = execSync('openssl enc -aes-256-cbc -d -pbkdf2 -in ~/.manus_credentials/contentful_mgmt_token.enc -pass pass:"$(hostname)-$(whoami)-manus-secure-2025"').toString().trim();

const SPACE_ID = 'yl1mk6fxklfe';
const ENV_ID = 'master';

function apiRequest(hostname, path, method, headers, data = null) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method, headers };
    
    const req = https.request(options, (res) => {
      let responseData = Buffer.alloc(0);
      res.on('data', (chunk) => {
        responseData = Buffer.concat([responseData, chunk]);
      });
      res.on('end', () => {
        const body = responseData.toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (e) {
            resolve({});
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function uploadAsset(name, filePath) {
  console.log(`\nUploading ${name}...`);
  
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = filePath.split('/').pop();
  
  // Step 1: Upload binary
  const upload = await apiRequest(
    'upload.contentful.com',
    `/spaces/${SPACE_ID}/uploads`,
    'POST',
    {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/octet-stream'
    },
    fileBuffer
  );
  console.log(`- Binary uploaded: ${upload.sys.id}`);
  
  // Step 2: Create asset
  const asset = await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/assets`,
    'POST',
    {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Contentful-Content-Type': 'application/vnd.contentful.management.v1+json'
    },
    JSON.stringify({
      fields: {
        title: { 'en-US': name },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
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
    })
  );
  console.log(`- Asset created: ${asset.sys.id}`);
  
  // Step 3: Process
  await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/assets/${asset.sys.id}/files/en-US/process`,
    'PUT',
    {
      'Authorization': `Bearer ${token}`,
      'X-Contentful-Version': asset.sys.version.toString()
    }
  );
  console.log(`- Processing started`);
  
  // Wait for processing
  await new Promise(r => setTimeout(r, 5000));
  
  // Step 4: Get updated asset
  const processedAsset = await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/assets/${asset.sys.id}`,
    'GET',
    { 'Authorization': `Bearer ${token}` }
  );
  
  // Step 5: Publish
  await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/assets/${asset.sys.id}/published`,
    'PUT',
    {
      'Authorization': `Bearer ${token}`,
      'X-Contentful-Version': processedAsset.sys.version.toString()
    }
  );
  console.log(`- Published`);
  
  return asset.sys.id;
}

async function getTeamMemberEntry(name) {
  const entries = await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/entries?content_type=teamMember&fields.Name=${encodeURIComponent(name)}`,
    'GET',
    { 'Authorization': `Bearer ${token}` }
  );
  if (entries.items && entries.items.length > 0) {
    return entries.items[0];
  }
  throw new Error(`Not found: ${name}`);
}

async function updateAvatar(name, assetId) {
  console.log(`\nUpdating ${name}'s avatar...`);
  
  const entry = await getTeamMemberEntry(name);
  console.log(`- Entry: ${entry.sys.id}`);
  
  const updated = await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/entries/${entry.sys.id}`,
    'PUT',
    {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Contentful-Version': entry.sys.version.toString()
    },
    JSON.stringify({
      fields: {
        ...entry.fields,
        Avatar: {
          'en-US': {
            sys: { type: 'Link', linkType: 'Asset', id: assetId }
          }
        }
      }
    })
  );
  
  await apiRequest(
    'api.contentful.com',
    `/spaces/${SPACE_ID}/environments/${ENV_ID}/entries/${entry.sys.id}/published`,
    'PUT',
    {
      'Authorization': `Bearer ${token}`,
      'X-Contentful-Version': updated.sys.version.toString()
    }
  );
  console.log(`- Published`);
}

async function main() {
  const updates = [
    ['Julia Fetty', '/home/ubuntu/SerenityTidesWebsite/generated_images/team_julia_v2.jpg'],
    ['Amanda LeVine', '/home/ubuntu/SerenityTidesWebsite/generated_images/team_amanda_v2.jpg'],
    ['Isabel Fudali', '/home/ubuntu/SerenityTidesWebsite/generated_images/team_isabel_v2.jpg']
  ];
  
  for (const [name, path] of updates) {
    try {
      const assetId = await uploadAsset(name, path);
      await updateAvatar(name, assetId);
      console.log(`✅ ${name} complete!`);
    } catch (e) {
      console.error(`❌ ${name} failed:`, e.message);
    }
  }
}

main();


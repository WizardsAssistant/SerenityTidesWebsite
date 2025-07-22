// Basic test to verify Jest is working correctly
describe('Basic Testing Infrastructure', () => {
  it('should run basic JavaScript tests', () => {
    expect(1 + 1).toBe(2)
    expect('hello').toBe('hello')
    expect(true).toBeTruthy()
  })

  it('should handle arrays and objects', () => {
    const testArray = [1, 2, 3]
    const testObject = { name: 'test', value: 42 }
    
    expect(testArray).toHaveLength(3)
    expect(testArray).toContain(2)
    expect(testObject).toHaveProperty('name')
    expect(testObject.name).toBe('test')
  })

  it('should handle async operations', async () => {
    const asyncFunction = async () => {
      return new Promise(resolve => setTimeout(() => resolve('done'), 10))
    }
    
    const result = await asyncFunction()
    expect(result).toBe('done')
  })

  it('should handle environment variables', () => {
    // These are set in jest.setup.js
    expect(process.env.CONTENTFUL_SPACE_ID).toBe('test-space-id')
    expect(process.env.CONTENTFUL_ACCESS_TOKEN).toBe('test-access-token')
  })
})


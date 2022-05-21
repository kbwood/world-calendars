module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'jsdom',
  testRegex: 'test/.+.test.ts',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
}
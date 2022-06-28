import { createProdMockServer } from 'vite-plugin-mock'

import userMock from './mock/user'

export function setupProdMockServer() {
  createProdMockServer([...userMock])
}
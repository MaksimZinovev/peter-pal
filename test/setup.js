import { vi } from 'vitest'

// Mock chrome API
global.chrome = {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: { addListener: vi.fn() },
  },
  storage: {
    sync: { get: vi.fn(), set: vi.fn() },
  },
  tabs: {
    query: vi.fn(),
    sendMessage: vi.fn(),
  },
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.message || 'EcoLens could not reach the server')
  }

  return body
}

export function saveQuizResult(result) {
  return apiRequest('/api/quiz-results', {
    method: 'POST',
    body: JSON.stringify(result),
  })
}

export function getQuizStats({ signal } = {}) {
  return apiRequest('/api/quiz-results/stats', { signal })
}

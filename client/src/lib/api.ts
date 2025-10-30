const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:4001';

// Unified fetch with basic ETag support (optional)
export async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${base}${path}`, { 
    ...init, 
    headers: { 
      'Content-Type': 'application/json', 
      ...(init?.headers||{}) 
    }
  });
  
  // EXPECTATION: Handle 304 (If-None-Match) if you implement ETag server-side in expert levels.
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`[API] ${res.status} ${text}`);
  }
  
  return res.json();
}


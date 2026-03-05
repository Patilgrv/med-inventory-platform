const defaultApiBase = 'https://localhost:7001/api';

export const org = {
    localhost: {
        apiBase : defaultApiBase
    },
    production: {
        apiBase : defaultApiBase
    }
}


export function getCurrentApiBase(): string {
    return org[window.location.hostname as keyof typeof org].apiBase;
  }
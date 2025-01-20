import { useState, useEffect } from 'react';

export function useIpAddress() {
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress('Unknown'));
  }, []);

  return ipAddress;
}

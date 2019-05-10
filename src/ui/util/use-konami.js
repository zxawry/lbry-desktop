import { useEffect, useState } from 'react';
import EnhancedLayoutListener from 'util/enhanced-layout';

export default function useKonami() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    new EnhancedLayoutListener(() => {
      if (isMounted) setIsActive(!isActive);
    });

    return () => {
      isMounted = false;
    };
  }, [isActive]);

  return isActive;
}

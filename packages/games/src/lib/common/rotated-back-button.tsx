import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';

export const RotatedBackButton = () => {
  return (
    <Button
      variant="third"
      onClick={() => window.history.back()}
      className="wr-fixed wr-z-[999999] wr-top-3 wr-left-3 wr-size-7"
    >
      <ArrowLeftIcon className="wr-flex-shrink-0 wr-h-3 wr-w-3" />
    </Button>
  );
};

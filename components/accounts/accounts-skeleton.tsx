import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function SingleAccountSkeleton() {
  return (
    <Card className='mb-4 pt-2'>
      <CardContent className='px-1 md:p-6 md:pt-0 flex flex-row items-start'>
        <div className='flex items-center space-x-4 mt-2'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AccountsSkeleton() {
  return (
    <div className='space-x-4 pt-4 w-full'>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-row justify-between'>
            Retrieving accounts from database..
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SingleAccountSkeleton />
          <SingleAccountSkeleton />
          <SingleAccountSkeleton />
          {/* }
          <div className='flex items-center space-x-4 mt-2 border rounded-sm'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          </div>
          <div className='flex items-center space-x-4 mt-2 border rounded-sm'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
  </div>*/}
        </CardContent>
      </Card>
    </div>
  );
}

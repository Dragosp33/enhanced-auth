'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';

import { BeatLoader } from 'react-spinners';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { NewVerification } from '@/actions/new-verification';
import { useState } from 'react';

import { FormError } from '@/components/form-error';

import { FormSuccess } from '@/components/form-success';

export const NewVerificationForm = () => {
  const params = useSearchParams();

  const token = params.get('token');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [refferer, setRefferer] = useState<string>('');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    console.log(token);
    if (!token) {
      setError('No token is present.');
      return;
    }
    NewVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setRefferer(data.id);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong..');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  console.log(refferer);
  return (
    <CardWrapper
      headerLabel='Confirming your token'
      backButtonHref={`/auth/login${refferer ? `?refferer=${refferer}` : ''}`}
      backButtonLabel='Back to login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}

        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

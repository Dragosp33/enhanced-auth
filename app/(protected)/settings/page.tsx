'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSession } from 'next-auth/react';

import * as z from 'zod';
import { SettingsSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { startTransition, useState, useTransition } from 'react';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { settings } from '@/actions/settings';
import {
  Form,
  FormLabel,
  FormDescription,
  FormMessage,
  FormField,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const ClientSettings = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [isPending, setIsPending] = useTransition();
  const [passCode, setPassCode] = useState<boolean>(false);
  const [emailChange, setEmailChange] = useState<boolean>(false);
  const user = useCurrentUser();
  console.log('curr user: ', { user });
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),

    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      oldPassword: '',
      newPassword: '',
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      role: user?.role || 'USER',
    },
  });

  console.log({ values: form.getValues() });
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log('???????????????');
    startTransition(() => {
      console.log('started transition;', { values });
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setMessage(undefined);
          }
          if (data.success) {
            update();
            setMessage(data.success);
            setError(undefined);
            setEmailChange(false);
            setPassCode(false);
          }
          if (data.emailChange) {
            setEmailChange(true);
            setMessage(undefined);
            setError(undefined);
            if (data.passCode) {
              setPassCode(true);
            }
            form.setValue('oldCode', '');
            form.setValue('newCode', '');
          }
          if (data.passCode && !data.emailChange) {
            setPassCode(true);
            setMessage(undefined);
            setError(undefined);
            form.setValue('passCode', '');
          }
        })
        .catch(() => {
          setError('Something went wrong..');
          setMessage(undefined);
        });
    });
  };

  return (
    <div className='mx-auto w-full min-w-0'>
      <div className='space-y-2 mb-4'>
        <h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>
          {' '}
          User infos
        </h1>
        <p className='text-lg text-muted-foreground space-y-1'>
          This is your user base-info page. Here you can view and edit basic
          sign in informations, such as email, password if registered with one,
          2FA and so on.
        </p>
        <p className='text-sm text-muted-foreground space-y-1'>
          For obvious reasons, if not registered via credentials with a
          password, you will not be able to modify the email, password ( as
          there is not one ) or 2FA
        </p>
      </div>
      <Card>
        <CardHeader>
          <h2> View & Edit </h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className='space-y-6'
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete='off'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        {...field}
                        placeholder='First Last'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        {...field}
                        placeholder='email@example.com'
                        disabled={isPending || emailChange || user?.isOAuth}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {emailChange && !error && !message && (
                <div className='flex flex-col md:flex-row'>
                  <FormField
                    control={form.control}
                    name='oldCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormLabel> current address OTP </FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Please enter the one-time password sent to your
                            current email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='newCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormLabel> new address OTP </FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Please enter the one-time password sent to your new
                            email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {user && !user.isOAuth && (
                <>
                  <FormField
                    control={form.control}
                    name='oldPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Old Password </FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            {...field}
                            placeholder='*******'
                            disabled={isPending || passCode}
                            autoComplete='nope'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> New password </FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            {...field}
                            placeholder='*******'
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* if the change of email is active, there is no point in verifying the user identity again for password */}
                  {!emailChange && passCode && (
                    <>
                      <FormField
                        control={form.control}
                        name='passCode'
                        render={({ field }) => (
                          <FormItem>
                            <FormItem>
                              <FormLabel>One-Time Password</FormLabel>
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormDescription>
                                Please enter the one-time password sent to your
                                phone.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}

              {/* Dummy password field */}
              <input
                type='password'
                value=''
                autoComplete='new-password'
                readOnly
                style={{ display: 'none' }}
              />
              {/* Dummy password field */}
              <input
                type='password'
                value=''
                readOnly
                autoComplete='current-password'
                style={{ display: 'none' }}
              />

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Role </FormLabel>
                    <FormDescription>
                      You will not be able to modify your role. Only direct
                      database connections should do.
                    </FormDescription>
                    <FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              type='text'
                              {...field}
                              placeholder='USER'
                              disabled
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              For obvious reasons, a user role can not be
                              modified
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user && !user.isOAuth && (
                <FormField
                  control={form.control}
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel> Two Factor Authentication</FormLabel>
                        <FormDescription>
                          {' '}
                          Enable 2FA for your account{' '}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormError message={error} />
              <FormSuccess message={message} />
              <Button type='submit' disabled={isPending}>
                {' '}
                Save{' '}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSettings;

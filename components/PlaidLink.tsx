'use client'; // Mark this file as a client component

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

type PlaidLinkProps = {
  user: any;
  variant?: 'primary' | 'ghost' | 'default';
  buttonText: string;
};

const PlaidLink = ({ user, variant, buttonText }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    }
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })
    router.push('/');
  }, [user])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button 
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          {buttonText}
        </Button>
      ) : variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost"
          className="plaidlink-ghost">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>{buttonText}</p>
        </Button>
      ) : (
        <Button onClick={() => open()}
          className="plaidlink-default">
          <Image 
            src="/icons/plus.svg"
            alt="add bank"
            width={20}
            height={20}
          />
          <h2 className="text-14 font-semibold text-gray-600">
            {buttonText}
          </h2> 
        </Button>
      )}
    </>
  )
}

export default PlaidLink

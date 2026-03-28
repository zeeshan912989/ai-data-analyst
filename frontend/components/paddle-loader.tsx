"use client";

import Script from "next/script";

export function PaddleLoader() {
  return (
    <Script 
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="lazyOnload"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).Paddle) {
          const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox';
          if (paddleEnv === 'sandbox') {
            (window as any).Paddle.Environment.set('sandbox');
          }
          (window as any).Paddle.Initialize({
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_token_here',
          });
        }
      }}
    />
  );
}

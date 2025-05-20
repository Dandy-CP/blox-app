import '@/styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { PagesProgressProvider as ProgressProvider } from '@bprogress/next';
import { queryClient } from '@/config/queryClient';
import AuthProvider from '@/context/AuthProvider';
import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageNoLayout = ['/auth', '/_error'];

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>BloX App</title>
      </Head>

      <AuthProvider>
        <ProgressProvider color="#59A1A5" height="5px">
          {pageNoLayout.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ProgressProvider>
      </AuthProvider>

      <ToastContainer />
    </QueryClientProvider>
  );
}

// pages/_app.js
import React from 'react';
import App from 'next/app';
import { SWRConfig } from 'swr';

import fetcher from '../requests/fetcher';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <SWRConfig 
        value={{
          fetcher: fetcher
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    )
  }
}

import React from 'react';
export declare type Handle = (e: React.MouseEvent<any>, ...extra: any[]) => void;
export default function prevent<H extends Handle>(handle?: Handle): H;

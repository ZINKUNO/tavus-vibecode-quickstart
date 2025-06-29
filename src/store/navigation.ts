import { atom } from 'jotai';

export type Page = 'home' | 'dashboard' | 'pricing' | 'login';

export const currentPageAtom = atom<Page>('home');
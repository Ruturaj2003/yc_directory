'use client';

import { X } from 'lucide-react';
import Link from 'next/link';

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    const input = document.querySelector('.search-input') as HTMLInputElement;

    if (form) {
      form.reset;
      input.value = '';
    }
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href={'/'} className="search-btn text-white">
        <X className="size-5>"></X>
      </Link>
    </button>
  );
};
export default SearchFormReset;

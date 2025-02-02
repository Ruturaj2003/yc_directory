import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action={'/'} scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        defaultValue={''}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset></SearchFormReset>}

        <button className="search-btn text-white" type="submit">
          <Search className="size-5"></Search>
        </button>
      </div>
    </Form>
  );
};
export default SearchForm;

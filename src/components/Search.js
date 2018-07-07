import React from 'react';

const Search = ({submit, change, value}) => {
  return (
    <form className='inputContainer'
      onSubmit={submit}>
      <input type='text'
        className='textInput'
        onChange={change}
        name='query'
        value={value} />

      <input type='submit'
        className='submitInput'
        value='Find Me a Drank!' />
    </form>
  );
}

export default Search;

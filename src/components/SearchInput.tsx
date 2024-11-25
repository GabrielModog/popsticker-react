/*
 * TODO:
 * - add search icon
 * - style input
* */
export default function SearchInput(){
  return <div className="search-input search-input__container">
    <label htmlFor="searchInput">🔎</label>
    <input id="searchInput" type="text" placeholder="Search" />
  </div>
}

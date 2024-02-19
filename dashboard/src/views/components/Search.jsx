

const Search = ({setParPage,setSearchValue,searchValue}) => {
    return (
        <div className="flex justify-between items-center ">
            <select onChange={(e) => setParPage(parseInt(e.target.value))} className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                <option value="5">5</option>
                <option selected value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
            </select>
            <input onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} type="text" placeholder="Search" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"/>
        </div>
    );
};

export default Search;
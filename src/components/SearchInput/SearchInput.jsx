
export default function SearchInput({handleSearch}) {
 
return <>

<form>
    <input onChange={handleSearch} type="text" placeholder="Search by name" className=" form-control border-0 border-bottom" />
</form>

</>
}

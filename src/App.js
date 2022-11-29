import './App.css';
import { useEffect, useState } from 'react';

const HOST = 'http://localhost:5000/'

function App() {
  const [companyData, setCompanyData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetCompanyData();
  }, [])
  
  function fetCompanyData(search) {
    var url = HOST + 'search'
    if(search) {
      url += '?search=' + search;
    }
    fetch(url)
    .then(res => res.json())
    .then(data => setCompanyData(data))
    .catch(err => alert(err.message))
  }

  return (
    <div className="border-box">
      {/* header */}
      <header className='p-4 text-3xl text-teal-600 shadow bg-gray-50 fixed top-0 w-full select-none'>
        React Search
      </header>

      {/* search input */}
      <div className='my-10 ml-4 mt-20'>
        <input type={'text'} name='search' className='text-teal-700 m-auto rounded-md px-4 py-2 outline-none ring-1'
        placeholder='Search Input'
        onKeyUp={e => {
          console.log(e.keyCode)
          if(e.keyCode == 13) {
            return fetCompanyData(e.target.value.trim())
          }
          setSearch(e.target.value)
        }}
        />
        {/* <button className='ml-4 ring-1 px-4 py-2 bg-blue-700 text-white rounded-md' onClick={handleSearch}>Search</button> */}
      </div>

      {/* result data */}
      <div>
        {/* <ShowTable companies={companyData} /> */}
        <PrintResult companies={companyData} />
      </div>
    </div>
  );
}


function ShowTable({ companies }) {
  return (
    <table className='border-2 w-full'>
      <thead>
        <tr className='bg-blue-200 py-4 w-full'>
          <th>CompanyName</th>
          <th>primaryText</th>
          <th>headline</th>
          <th>description</th>
          <th>CTA</th>
          <th>imageUrl</th>
        </tr>
      </thead>
      <tbody>
        {
          companies.map(({name, company}, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{company.headline}</td>
              <td>{company.primaryText}</td>
              <td>{company.description}</td>
              <td>{company.CTA}</td>
              <td>{company.imageUrl}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

function PrintResult({ companies }) {
  return (
    <div className='p-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center items-stretch'>
      {
        companies.map((company, i) => <Card key={i} {...company} />)
      }
    </div>
  )
}

function Card({name, company}) {
  return (
    <div className=" max-w-sm rounded overflow-hidden shadow-lg max-auto sm:w-full">
      <img className="w-full max-h-60 md:max-h-80" src={HOST + company.imageUrl} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name} 
          {/* <a href={company.imageUrl} target="blank" classNameName="text-sm text-thin text-blue-500 float-right">image url</a> */}
        </div>
        <p className="text-gray-700 text-base">
          {company.headline}
        </p>
        <p className="text-gray-700 text-base">
          {company.primaryText}
        </p>
        <p className="text-gray-700 text-base">
          {company.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{company.CTA}</span>
      </div>
    </div>
  )
}

export default App;

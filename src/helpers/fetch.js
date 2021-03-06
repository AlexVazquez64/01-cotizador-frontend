const baseUrl = process.env.REACT_APP_API_URL;


const fetchWithoutToken = ( enpoint, data, method = 'GET' ) => {

  const url = `${ baseUrl }/${ enpoint }`;

  console.log(url)

  if ( method === 'GET' ) {
    return fetch( url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Content-type': 'application/pdf'
        },
      })
  } else {
    return fetch( url, {
      method,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-type': 'application/json'
      },
      body: JSON.stringify( data )
    });
  }
}

const fetchWithToken = ( enpoint, data, method = 'GET' ) => {

  const url = `${ baseUrl }/${ enpoint }`;
  const token = localStorage.getItem('token') || '';

  if ( method === 'GET' ) {
    return fetch( url, {
      method,
      headers: {
        'x-token': token
      }
    } );
  } else {
    return fetch( url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( data )
    });
  }
}

export {
  fetchWithoutToken,
  fetchWithToken
}
const Notification = ({ msgStyle, message }) => {
  const sucessStyle={
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const failStyle={
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null){
    return null
  }
  if (msgStyle ==='sucess'){
    return(
      <div style={sucessStyle}> {message} </div>
    )
  }
  else if(msgStyle ==='fail'){
    return(
      <div style={failStyle}> {message} </div>
    )
  }
}

export default Notification
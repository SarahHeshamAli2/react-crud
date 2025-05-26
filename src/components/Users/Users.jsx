import { Button, Card, CardImg, CardText } from "react-bootstrap";
import SearchInput from "../SearchInput/SearchInput";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import femaleIcon from '../../assets/female.png';
import maleIcon from '../../assets/male.png';

export default function Users({ users, deleteUserData, updateUserData, genericToast, handleSearch ,searchTerm }) {
  function highlightText(text, highlight) {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} style={{ backgroundColor: 'yellow' }}>{part}</mark>
    ) : (
      part
    )
  );
}
  const [deleteToast, setDeleteToast] = useState("");

  const handleDelete = (id) => {
    deleteUserData(id);
    setDeleteToast("User deleted!");
  };
  useEffect(() => {
    if (deleteToast) {
      const timer = setTimeout(() => {
        setDeleteToast("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [deleteToast]);

  return (
    <div className=" mx-auto mt-2">
      {deleteToast && <Toast bg="danger" toast={deleteToast} />}
      {genericToast && <Toast bg="success" toast={genericToast} />}

    <div className="my-2">
          {users.length > 0 || searchTerm ? <>
          <h1>List Of Added Users</h1>
          <SearchInput  handleSearch={handleSearch}  />
          </> :''}
    </div>

      {users?.length > 0 ? (
        <div className="row g-3">
         {users.map((user) => (
  <div key={user.id} className="col-lg-4 col-md-4 text-center">
    <Card className="card-hover-animate">
      <Card.Title
        className="d-flex justify-content-center align-items-center mt-2 border border-2 rounded-circle fs-2 bg-light mx-auto text-primary"
        style={{ width: "80px", height: "80px" }}
      >
        {user.isFemale !== "" ? (
          <CardImg
            className="w-75"
            src={user.isFemale === "Female" ? femaleIcon : maleIcon}
          />
        ) : (
          <CardText>{user.name[0]}</CardText>
        )}
      </Card.Title>
      <Card.Body>
        <Card.Title>{highlightText(user.name, searchTerm)}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
        <Card.Text>{user.age}</Card.Text>
        <Button
          onClick={() => handleDelete(user.id)}
          variant="outline-danger mx-2 my-2"
        >
          Delete User
        </Button>
        <Button onClick={() => updateUserData(user.id)} variant="outline-warning">
          Update User
        </Button>
      </Card.Body>
    </Card>
  </div>
))}
        </div>
      ) : searchTerm ? (
        <p className="text-center text-muted mt-4">No users found.</p>
      ):null}
    </div>
  );
}

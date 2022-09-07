import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListUsers, deleteUser } from "../slices/usersSlice";

function UserManagement() {
  const dispatch = useDispatch();
  const { listUsers = [], loading } = useSelector(({ users }) => users);
  const [userToDelete, setUserToDelete] = useState(false);
  const handleCloseDeleteModal = () => setUserToDelete(false);
  // const {productList}= useSelector(state=>state.Products)
  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  const handleDeleteUser = (user) => () => setUserToDelete(user);

  return (
    <div style={{ padding: 32 }}>
      <br />
      <h1>User Managment</h1>
      <br />
      {listUsers?.map((user) => (
        <Card key={user._id} style={{ marginTop: 16, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{user.email}</strong>
            <Button
              variant="danger"
              style={{ maxWidth: 100 }}
              onClick={handleDeleteUser(user)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
      <Modal show={!!userToDelete} onHide={handleCloseDeleteModal}>
        <div style={{ margin: 16, padding: 16 }}>
          <p> Confirm deleting user : {userToDelete?.email} </p>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="secondary"
              style={{ maxWidth: 100 }}
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              style={{ maxWidth: 100 }}
              onClick={() => {
                dispatch(deleteUser(userToDelete?._id));
                handleCloseDeleteModal();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserManagement;

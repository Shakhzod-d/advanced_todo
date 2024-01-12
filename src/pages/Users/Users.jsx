import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectCount } from "../../features/todoSlice";
import Card from "../../components/Card/Card";

export const Users = () => {
  const { users = [], loading = false } = useSelector(selectCount);
  const dispatch = useDispatch();

  // fetchTodos
  // console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      {loading && `loading...`}

      <br />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!loading &&
          users.length > 0 &&
          users?.map((item) => (
            <Card key={item.id} isRole={false}>
              <div>
                {/* {JSON.stringify(item)} */}

                <p>Role: {item.role}</p>
                <p>Name: {item.name}</p>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

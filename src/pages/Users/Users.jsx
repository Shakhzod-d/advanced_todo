import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { selectUsers } from "../../features/user/selectors";
import { fetchUsers } from "../../features/user/action";

export const Users = () => {
  const { users = [], loading = false } = useSelector(selectUsers);
  const dispatch = useDispatch();

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

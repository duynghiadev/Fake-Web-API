import React, { useEffect, useState } from "react";

function Registration() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [comment, setComment] = useState("");
  const [tandc, setTandc] = useState(false);

  const [reqId, setReqId] = useState("");
  const [reqName, setReqName] = useState("");
  const [reqCountry, setReqCountry] = useState("");
  const [reqComment, setReqComment] = useState("");
  const [reqTandc, setReqTandc] = useState("");
  const [btnText, setBtnText] = useState("Submit");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:8080/Users")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    resetErrorMessage();

    if (Validate()) {
      if (btnText === "Submit") {
        fetch("http://localhost:8080/Users/", {
          method: "POST",
          body: JSON.stringify({
            id: id,
            name: name,
            country: country,
            comment: comment,
            tandc: tandc,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            alert("Record inserted");
            getData();
            resetForm();
            resetErrorMessage();
          });
      } else {
        fetch("http://localhost:8080/Users/" + id, {
          method: "PUT",
          body: JSON.stringify({
            name: name,
            country: country,
            comment: comment,
            tandc: tandc,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            alert("Record updated");
            getData();
            resetForm();
            resetErrorMessage();
          });
      }
    }
    // console.log(name,country,comment,tandc)
  };

  const Validate = () => {
    if (id.trim() === "") setReqId("required");
    else if (name.trim() === "") setReqName("required");
    else if (country.trim() === "") setReqCountry("required");
    else if (comment.trim() === "") setReqComment("required");
    else if (tandc === false) setReqTandc("required");
    else return true;
  };

  const resetErrorMessage = () => {
    setReqId("");
    setReqName("");
    setReqCountry("");
    setReqComment("");
    setReqTandc("");
  };

  const resetForm = () => {
    setId("");
    setName("");
    setCountry("");
    setComment("");
    setTandc(false);
    setBtnText("Submit");
  };

  const deleteRecord = (id) => {
    fetch("http://localhost:8080/Users/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((result) => {
        alert("Record deleted");
        getData();
      });
  };

  const editRecord = (item) => {
    setId(item.id);
    setName(item.name);
    setCountry(item.country);
    setComment(item.comment);
    setTandc(item.tandc);
    setBtnText("Update");
  };

  return (
    <div>
      <h1 style={{ color: "red" }}> CRUD Operation With Json Server</h1>
      <div style={{ width: "40%", float: "left", marginLeft: "60px" }}>
        <form onSubmit={submit}>
          <table className="users-table">
            <tbody>
              <tr>
                <th colSpan="2">
                  <center>User Registration Form</center>
                </th>
              </tr>
              <tr>
                <td>
                  <b>Id</b>
                </td>
                <td>
                  <input
                    type="text"
                    value={id}
                    name="id"
                    onChange={(e) => setId(e.target.value)}
                  />
                  <br />
                  {reqId === "required" && (
                    <span className="txt-red">Please enter id</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b> Name</b>
                </td>
                <td>
                  <input
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  {reqName === "required" && (
                    <span className="txt-red">Please enter name</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Country</b>
                </td>
                <td>
                  <select
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">-----------Select------------</option>
                    <option value="India">India</option>
                    <option value="US">US</option>
                    <option value="VN">Vietnamese</option>
                  </select>
                  <br />
                  {reqCountry === "required" && (
                    <span className="txt-red">Please select country</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Comment</b>
                </td>
                <td>
                  <textarea
                    value={comment}
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <br />
                  {reqComment === "required" && (
                    <span className="txt-red">Please enter comment</span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="checkbox"
                    checked={tandc}
                    name="tandc"
                    onChange={(e) => setTandc(e.target.checked)}
                  />
                  <b> Term & condition </b>
                  <br />
                  {reqTandc === "required" && (
                    <span className="txt-red">
                      Please check term & condition
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input type="submit" value={btnText} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <div style={{ width: "40%", float: "right", marginRight: "80px" }}>
        <table className="users-table">
          <tbody>
            <tr>
              <th>Id </th>
              <th>Name </th>
              <th>Country</th>
              <th>Comment</th>
              <th>Term & Condition</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {data
              ? data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id} </td>
                    <td>{item.name} </td>
                    <td>{item.country}</td>
                    <td> {item.comment}</td>
                    <td>{item.tandc + ""}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          editRecord(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          deleteRecord(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Registration;

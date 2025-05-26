export default function AddUser({ addButton, handleSubmit, handleChange, userInfo }) {
  const isAddMode = addButton === 'Add User';
  const buttonClass = isAddMode ? 'btn btn-outline-primary' : 'btn btn-outline-warning';

  return <>


    <form className="mx-auto mt-2" onSubmit={handleSubmit}>
        <h2>Let’s Get to Know You!</h2>
      <label htmlFor="userName">Name:</label>
      <input
        name="name"
        onChange={handleChange}
        value={userInfo.name}
        id="userName"
        type="text"
        className="form-control w-100"
      />

      <label htmlFor="userAge">Age:</label>
      <input
        onChange={handleChange}
        name="age"
        value={userInfo.age}
        id="userAge"
        type="number"
        className="form-control w-100"
      />

      <label htmlFor="userEmail">Email:</label>
      <input
        onChange={handleChange}
        name="email"
        value={userInfo.email}
        id="userEmail"
        type="email"
        className="form-control w-100"
      />

      <div className="gender d-flex gap-3 mt-2">
        <div className="male">
          <input
            onChange={handleChange}
            value={'Male'}
            name="isFemale"
            type="radio"
            checked={userInfo.isFemale === "Male"}
          />
          <label>Male</label>
        </div>
        <div className="female">
          <input
            onChange={handleChange}
            value={'Female'}
            name="isFemale"
            type="radio"
            checked={userInfo.isFemale === "Female"}
          />
          <label>Female</label>
        </div>
      </div>

      <button className={buttonClass + ` w-100 mt-3`}>
        {addButton}
      </button>
    </form>
  </>
}

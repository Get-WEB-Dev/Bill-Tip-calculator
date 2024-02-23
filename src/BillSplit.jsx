import { useState } from "react";
import { Button } from "./App";

export default function BillSplit({
  step,
  onShow,
  onSelect,
  setSelectedFriend,
  selectedFriend,
  setShowAddFriend,
  showAddFriend,
}) {
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className={`app1 ${step == 2 ? "hiding" : ""}`}>
      <div className="container">
        <div className="sidebar">
          {showAddFriend ? (
            <FormAddFriend onAddFriend={handleAddFriend} />
          ) : (
            <FriendsList
              friends={friends}
              selectedFriend={selectedFriend}
              onSelection={onSelect}
            />
          )}
        </div>
        <Button onClick={onShow}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <h1>Friends List</h1>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li
      className={isSelected ? "selected" : ""}
      onClick={() => onSelection(friend)}
    >
      <div className="name">
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
      </div>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Friend form</h1>
      <div className="fields">
        {" "}
        <label>👫 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>🌄 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="button">
          <Button>Add</Button>
        </div>
      </div>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Split a bill with {selectedFriend.name}</h2>
        <div className="fields">
          <label>💰 Bill value</label>
          <input
            type="text"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />

          <label>🧍‍♀️ Your expense</label>
          <input
            type="text"
            value={paidByUser}
            onChange={(e) =>
              setPaidByUser(
                Number(e.target.value) > bill
                  ? paidByUser
                  : Number(e.target.value)
              )
            }
          />

          <label>👫 {selectedFriend.name}'s expense</label>
          <input type="text" disabled value={paidByFriend} />

          <label>🤑 Who is paying the bill</label>
          <select
            value={whoIsPaying}
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="user">You</option>
            <option value="friend">{selectedFriend.name}</option>
          </select>
          <div className="button">
            <Button>Split Bill</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

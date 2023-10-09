import { useState } from "react";
import Link from "next/link";
import { MIN_USERNAME_LENGTH } from "../../utils/Constants";
import "../../styles/roomForm.scss";

const RoomForm = ({ handleSubmit }) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [errors, setErrors] = useState({
        usernameErr: null,
        roomErr: null,
    });

    const onJoin = (event) => {
        event.preventDefault();

        const { usernameErr, roomErr } = errors;

        if (
            username !== "" &&
            room !== "" &&
            usernameErr == null &&
            roomErr == null
        ) {
            const user = {
                username,
                room,
            };
            handleSubmit(user);
        } else {
            // if both the field are null
            if (!usernameErr && !roomErr) {
                setErrors({
                    usernameErr: "Username can't be empty!",
                    roomErr: "Room name can't be empty!",
                });
            }
        }
    };
    /**
     * Validating form fields
     * @param  {String} {name
     * @param  {String} value}
     */
    const validate = ({ name, value }) => {
        let { usernameErr, roomErr } = errors;

        switch (name) {
            case "username":
                if (value.length == 0) usernameErr = "Username can't be empty!";
                else if (value.length < MIN_USERNAME_LENGTH)
                    usernameErr = "Username is too short!";
                else usernameErr = null;
                break;
            case "room":
                if (value.length == 0) roomErr = "Room name can't be empty!";
                else if (value.length > 0 && value.includes(" "))
                    roomErr = "Room name can't have spaces!";
                else roomErr = null;
                break;
        }
        setErrors({
            usernameErr,
            roomErr,
        });
    };

    /**
     * add error class if error exist
     * @param  {String} error
     */
    const addErrorClass = (error) => {
        if (error) return "error";
        return "";
    };

    return (
        <div className="chat-form-container container">
            <div className="row justify-content-center m-0 text-center">
                <h2 className="mt-5 mb-5">Welcome again to Anomly!</h2>
            </div>
            <div className="row justify-content-center align-items center m-0">
                <div className="chat-form col-11 col-sm-6 col-md-4 p-0">
                    <div className="row justify-content-center align-items-center m-0">
                        <Link href="/">
                            <a>
                                <img src="/images/chat-logo1.png" alt="icon" />
                            </a>
                        </Link>
                    </div>
                    <form onSubmit={onJoin}>
                        <div
                            className={`form-group ${addErrorClass(
                                errors.usernameErr
                            )}`}>
                            <label>Display name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                    validate(event.target);
                                }}
                            />
                            {errors.usernameErr ? (
                                <span>
                                    <i className="fa fa-exclamation-triangle"></i>
                                    <small className="pl-2">
                                        {errors.usernameErr}
                                    </small>
                                </span>
                            ) : null}
                        </div>
                        <div
                            className={`form-group ${addErrorClass(
                                errors.roomErr
                            )}`}>
                            <label>Room name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="room"
                                value={room}
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                    validate(event.target);
                                }}
                            />
                            {errors.roomErr ? (
                                <span>
                                    <i className="fa fa-exclamation-triangle"></i>
                                    <small className="pl-2">
                                        {errors.roomErr}
                                    </small>
                                </span>
                            ) : null}
                        </div>

                        <input
                            className="btn"
                            type="submit"
                            value="Join Chat"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoomForm;

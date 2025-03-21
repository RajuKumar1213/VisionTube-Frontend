import React, { useEffect, useState } from "react";
import { Button, Input, Playlist } from "../components";
import playlistServide from "../services/playlist.service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import playlistService from "../services/playlist.service";
import { useForm } from "react-hook-form";
import { showTimedAlert } from "../redux/features/alertSlice";

function PlaylistPage({ channel }) {
  const { register, handleSubmit } = useForm();
  const [playlist, setPlaylist] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // window.scrollTo(0, 0);

    playlistServide
      .getUserPlaylists(channel?._id)
      .then((response) => {
        if (response.statusCode === 200) {
          setPlaylist(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreatePlaylist = (data) => {
    if (data) {
      playlistService.createPlaylist(data).then((response) => {
        if (response.statusCode === 201) {
          setIsOpen(false);
          dispatch(
            showTimedAlert({
              message:
                "Playlist created successfully, now you can add videos to it",
              type: "success",
              duration: 5000,
            })
          );
          navigate(`/playlist/${response.data?._id}/create`);
        }
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Playlists</h1>
        {userData?.username === channel?.username && (
          <Button onClick={() => setIsOpen(true)}>Create a Playlist</Button>
        )}
      </div>

      {playlist && playlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {playlist.map((playlist) => (
            <Playlist key={playlist._id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl text-gray-500 font-thin mb-6 m-8">
            No Playlists Found for this channel
          </h1>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit(handleCreatePlaylist)}
            className="bg-secondary rounded-lg shadow-lg p-6 w-full max-w-lg"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Create Playlist</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <div>
                <Input
                  label="Playlist Name"
                  placeholder="Enter playlist name"
                  type="text"
                  required
                  {...register("name", { required: true })}
                />
              </div>

              <div>
                <Input
                  label="Playlist Description"
                  placeholder="Enter playlist description"
                  type="text"
                  required
                  {...register("description", { required: true })}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end mt-4 gap-x-2">
              <Button
                className="bg-gray-400 text-black text-ba"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreatePlaylist}>
                Create
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlaylistPage;

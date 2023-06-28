import UserHeader from "@/components/UserHeader";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

export default function Links() {
  const [links, setLinks] = useState([{ url: "", title: "", icon: "" }]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    const linkToUpdate = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = linkToUpdate;
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: "", title: "", icon: "" }]);
  };

  const handleRemoveLink = (index) => {
    const updateLinks = [...links];
    updateLinks.splice(index, 1);
    setLinks(updateLinks);
  };

  const saveLinks = (e) => {
    e.preventDefault();
    const linksArray = Object.values(links);
    const titleArray = Object.values(title);
    const linksData = linksArray.map((link, index) => ({
      link,
      title: titleArray[index],
    }));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/save/links`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        links: linksData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Lỗi xảy ra khi lưu thông tin!");
        }
        toast.success("Cập nhật thành công!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken")) return router.push("/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/links`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Kết nối server thất bại!");
        }
        setLinks(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Danh sách liên kết</title>
      </Head>
      <div className="p-8">
        <UserHeader />
        <main>
          <section>
            <h1 className="text-center font-bold text-[18px] mt-8">
              Thêm liên kết của bạn
            </h1>
            <div className="w-full mt-8">
              <form onSubmit={saveLinks} className="links flex flex-col gap-12">
                <div className="lists flex flex-col gap-4">
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="w-full flex gap-4 flex-wrap items-center select-none"
                    >
                      <b>{index + 1}./</b>
                      <div className="flex-1 flex items-center">
                        <b className="mr-4">Icon:</b>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleLinkChange(index, "icon", "/svg/blog.svg")
                            }
                            className={`${
                              link.icon === "/svg/blog.svg" && "border-sky-600"
                            } border-2 hover:border-sky-600 rounded-lg p-2`}
                          >
                            <img className="w-6" src="/svg/blog.svg" />
                          </button>
                          <button
                            onClick={() =>
                              handleLinkChange(index, "icon", "/svg/web.svg")
                            }
                            className={`${
                              link.icon === "/svg/web.svg" && "border-sky-600"
                            } border-2 hover:border-sky-600 rounded-lg p-2`}
                          >
                            <img className="w-6" src="/svg/web.svg" />
                          </button>
                          <button
                            onClick={() =>
                              handleLinkChange(index, "icon", "/svg/port.svg")
                            }
                            className={`${
                              link.icon === "/svg/port.svg" && "border-sky-600"
                            } border-2 hover:border-sky-600 rounded-lg p-2`}
                          >
                            <img className="w-6" src="/svg/port.svg" />
                          </button>
                          <button
                            onClick={() =>
                              handleLinkChange(index, "icon", "/svg/box.svg")
                            }
                            className={`${
                              link.icon === "/svg/box.svg" && "border-sky-600"
                            } border-2 hover:border-sky-600 rounded-lg p-2`}
                          >
                            <img className="w-6" src="/svg/box.svg" />
                          </button>
                          <button
                            onClick={() =>
                              handleLinkChange(index, "icon", "/svg/link.svg")
                            }
                            className={`${
                              link.icon === "/svg/link.svg" && "border-sky-600"
                            } border-2 hover:border-sky-600 rounded-lg p-2`}
                          >
                            <img className="w-6" src="/svg/link.svg" />
                          </button>
                        </div>
                      </div>
                      <label className="flex-1 flex items-center">
                        <b>URL:</b>
                        <input
                          className="border-2 px-4 ml-4 py-1 rounded-lg flex-1"
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, "url", e.target.value)
                          }
                        />
                      </label>
                      <label className="flex-1 flex items-center">
                        <b>Tiêu đề: </b>
                        <input
                          className="border-2 px-4 ml-4 py-1 rounded-lg flex-1"
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            handleLinkChange(index, "title", e.target.value)
                          }
                        />
                      </label>
                      <button
                        className="bg-red-600 py-1 px-4 rounded-lg text-white text-[13px] font-bold"
                        type="button"
                        onClick={() => handleRemoveLink(index)}
                      >
                        Xóa liên kết
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-12 ml-auto">
                  <button
                    className="bg-green-600 py-1 px-4 text-white rounded-lg font-bold"
                    type="button"
                    onClick={handleAddLink}
                  >
                    Thêm liên kết
                  </button>
                  <button
                    className="bg-sky-600 py-1 px-4 text-white rounded-lg font-bold"
                    type="submit"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

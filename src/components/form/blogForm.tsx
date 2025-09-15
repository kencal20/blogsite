import React, { useState, useEffect } from "react";
import { useAuth, ModalComponent } from "../../constants/path";
import { useNavigate } from "react-router-dom";

type BlogFormData = {
  title: string;
  description: string;
  date_published: string;
  read_time: string;
  tags: string[];
  image?: string; // ✅ changed to string | undefined (no File, no null)
};

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (blog: BlogFormData, blogId?: string) => void;
  initialData?: BlogFormData;
  isEdit?: boolean;
  blogId?: string;
};

export default function BlogForm({
  isOpen,
  onRequestClose,
  onSubmit,
  initialData,
  isEdit = false,
  blogId,
}: Props) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    date_published: "",
    read_time: "",
    tags: [],
    image: undefined,
  });

  const [tagInput, setTagInput] = useState("");
  const [imageType, setImageType] = useState<"file" | "url">("file");
  const [fileImage, setFileImage] = useState<File | null>(null); // ✅ store actual file separately
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        date_published: initialData.date_published ?? "",
        read_time: initialData.read_time ?? "",
        tags: initialData.tags ?? [],
        image: initialData.image ?? undefined,
      });

      if (initialData.image) setImageType("url");
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileImage(e.target.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    let imageUrl: string | undefined = formData.image;

    // If user selected a file, convert to temporary object URL (or upload later)
    if (fileImage) {
      imageUrl = URL.createObjectURL(fileImage);
    }

    const blogToSave: BlogFormData = {
      ...formData,
      image: imageUrl,
      author: user.email, // ✅ include author here
      date_published: formData.date_published || new Date().toISOString(),
    } as BlogFormData;

    onSubmit(blogToSave, blogId);
    onRequestClose();

    if (!isEdit) {
      setFormData({
        title: "",
        description: "",
        date_published: "",
        read_time: "",
        tags: [],
        image: undefined,
      });
      setFileImage(null);
      setImageType("file");
    }
  };

  return (
    <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[70vw] h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 shrink-0">
          {isEdit ? "✏️ Edit Blog" : "✍️ Create New Blog"}
        </h2>

        <form
          onSubmit={handleSubmit}
          id="blog-form"
          className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 p-3 rounded-lg outline-none transition"
            required
          />

          <textarea
            name="description"
            placeholder="Write your blog description..."
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 p-3 rounded-lg outline-none transition resize-y w-full min-h-[80px]"
          />

          <input
            type="text"
            name="read_time"
            placeholder="Estimated read time (e.g. 5 min)"
            value={formData.read_time}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 p-3 rounded-lg outline-none transition"
          />

          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg flex-1"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Choose Image Type:</p>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="imageType"
                  value="file"
                  checked={imageType === "file"}
                  onChange={() => setImageType("file")}
                />
                Upload File
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="imageType"
                  value="url"
                  checked={imageType === "url"}
                  onChange={() => setImageType("url")}
                />
                Use URL
              </label>
            </div>

            {imageType === "file" ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-100 file:text-blue-700
                           hover:file:bg-blue-200"
              />
            ) : (
              <input
                type="text"
                placeholder="Enter image URL"
                value={formData.image ?? ""}
                onChange={handleUrlChange}
                className="border border-gray-300 p-3 rounded-lg w-full"
              />
            )}

            {(formData.image || fileImage) &&
              (imageType === "url" ? (
                <img
                  src={formData.image}
                  alt="Blog"
                  className="mt-3 w-32 h-32 object-cover rounded-lg border"
                />
              ) : (
                <p className="mt-2 text-gray-500 text-sm">
                  {fileImage?.name ?? ""}
                </p>
              ))}
          </div>
        </form>

        <div className="flex justify-end gap-3 mt-4 shrink-0">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="blog-form"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition"
          >
            {isEdit ? "Update Blog" : "Publish Blog"}
          </button>
        </div>
      </div>
    </ModalComponent>
  );
}

import { PhotoIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const HomePage = ({ sideBarVisible }: { sideBarVisible: boolean }) => {
    const [tags, setTags] = useState<Array<String>>([
        "computer",
        "motherboard",
        "aorus",
    ]);

    /**
     * Handles the click event on a tag button.
     * It removes the tag from the list of tags.
     * @param tag - The index of the tag to be removed.
     */
    function handleTagClick(tag: number) {
        setTags((prevTags) => {
            const newTags = [...prevTags];
            newTags.splice(tag, 1);
            return newTags;
        });
    }

    /**
     * Generates a list of tags as buttons.
     * Each button displays a tag and has an onClick handler to remove the tag.
     * @returns A list of tags as buttons.
     */
    function listTags() {
        return tags.map((tag, index) => (
            <button
                id={`tag-${index}`}
                key={index}
                onClick={() => handleTagClick(index)}
                className="group flex flex-row justify-between gap-1 bg-purple-100 text-sm px-2 rounded-full text-purple-500 hover:cursor-pointer hover:text-purple-700 hover:bg-purple-300 transition-colors duration-100 active:bg-purple-200"
            >
                #{tag}
                <XMarkIcon className="hidden text-transparent w-3 group-hover:inline group-hover:text-purple-800" />
            </button>
        ));
    }

    return (
        <div className="flex flex-row w-full">
            <div className="min-h-[calc(100vh-70px)] w-full px-4 mt-1">
                {/* Tab bar */}
                <div
                    className={`flex flex-col justify-between transition-all duration-300 ${
                        sideBarVisible ? "pl-55" : "pl-0"
                    }`}
                >
                    <div
                        className={`flex flex-wrap w-full justify-between gap-2 py-8`}
                    >
                        {/* Tag input */}
                        <div className="relative flex flex-row items-center">
                            <input
                                type="text"
                                className="text-sm text-black bg-purple-100 border-1 border-purple-200 rounded-l-full focus:outline-none focus:border-1 focus:border-purple-400 focus:bg-purple-300 transition-colors duration-100 pl-2"
                                placeholder="Add tag..."
                            />
                            <button className="border-1 border-gray-300 px-2 text-sm rounded-r-full hover:cursor-pointer hover:bg-gray-200">
                                Add
                            </button>
                        </div>
                        {/* Tag list */}
                        <div className="flex flex-row justify-between gap-2">
                            {listTags()}
                        </div>
                    </div>
                    {/* Main content area */}
                    <div className="flex flex-wrap flex-row justify between gap-10">
                        {/* Example card 1 */}
                        <div className="flex flex-col w-60 rounded-md border-2 border-purple-300 hover:border-purple-500 hoverborder-3">
                            <div className="bg-purple-200 w-full text-purple-300 rounded-t-md">
                                <PhotoIcon className="w-auto" />
                            </div>
                            <div className="flex flex-col p-4">
                                <h3 className="text-wrap font-bold w-full">
                                    Z790 AORUS ELITE AX
                                </h3>
                                <div className="flex flex-row justify-start gap-1">
                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                </div>
                                <p className="text-sm pt-4">@Gigabyte</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

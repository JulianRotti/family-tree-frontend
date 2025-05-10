import {
    Button,
    useFileUploadContext
} from "@chakra-ui/react";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "components/ui/chakra-snippets/file-upload.jsx";
import { HiUpload } from "react-icons/hi";
import { useEffect } from "react";

const ImageUploader = ({ watch, setValue }) => {
    const watchMemberImage = watch("member_image");
    useEffect(() => {
        console.log("Current Image File:", watchMemberImage);
    }, [watchMemberImage]);  // Logs only when `member_image` changes

    const addAcceptedFiles = ({ files }) => {
        const uniqueFiles = files.reduce((acc, file) => {
            if (!acc.some((f) => f.name === file.name || f.lastModified === file.lastModified)) {
                acc.push(file);
            }
            return acc;
        }, []);

        if (uniqueFiles.length > 0) {
            setValue("member_image", uniqueFiles, { shouldValidate: true });
        } else {
            setValue("member_image", null, { shouldValidate: true });
        }
    };

    const removeFile = (file) => {

        let memberImage = watchMemberImage;
        memberImage = memberImage.filter((f) => f !== file);
        setValue("member_image", memberImage, { shouldValidate: true });

        if (memberImage.length === 0) {
            setValue("member_image", null, { shouldValidate: true });
        }
    };
    return (
        <FileUploadRoot
            accept={["image/png", "image/jpeg", "image/jpg"]}
            maxFiles={1}
            minFileSize={10}
            onFileAccept={addAcceptedFiles}
            allowDrop
            name="member_image"
        >
            <FileUploadTrigger
                asChild
            >
                <Button
                    variant="outline"
                    size="sm"
                >
                    <HiUpload /> Bild hochladen
                </Button>
            </FileUploadTrigger>
            <FileUploadList
                memberImage={watchMemberImage}
                showSize
                clearable
                borderRadius="full"
                fit="cover"
                onFileRemove={removeFile}
            />
        </FileUploadRoot>
    );
};

export default ImageUploader;
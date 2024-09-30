/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller, Control } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import GhostButton from "../buttons/GhostButton";

interface ImageUploadProps {
  control: Control<any>;
  name: string;
  maxNumber?: number;
  label?: string;
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  control,
  name,
  maxNumber = 4, // You can set a default max number of images
  label,
  required,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={[]} // Default value is an empty array
        rules={{
          validate: (value) => {
            if (required && value.length === 0) {
              return "Please upload at least one image.";
            }
            return true;
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <ImageUploading
            multiple
            value={value} // Value from react-hook-form
            onChange={(imageList: ImageListType) => {
              onChange(imageList); // Update form state with new images
            }}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div>
                {imageList?.length !== 0 && (
                  <GhostButton
                    className="text-xs mb-1"
                    onClick={(e) => {
                      e.preventDefault();
                      onImageRemoveAll();
                    }}
                    sm
                  >
                    Remove all
                  </GhostButton>
                )}
                <div className="upload__image-wrapper flex flex-wrap gap-2 items-center">
                  <button
                    className="py-10 px-16 border-dashed border-[1.5px]"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onImageUpload();
                    }}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>

                  {/* Display image list */}
                  {imageList.map((image, index) => (
                    <div key={index}>
                      <div>
                        <div className="image-item">
                          <img
                            src={image["data_url"]}
                            alt=""
                            className="h-14 w-[102px]"
                          />
                        </div>
                        <div className="image-item__btn-wrapper">
                          <button
                            className="text-xs py-[2px] px-1 bg-slate-600 mr-1 text-white rounded-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              onImageUpdate(index);
                            }}
                          >
                            Update
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onImageRemove(index);
                            }}
                            className="text-xs py-[2px] px-1 bg-red-600 text-white rounded-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {error && (
                  <p className="text-red-600 text-sm mt-1">{error?.message}</p>
                )}
              </div>
            )}
          </ImageUploading>
        )}
      />
    </div>
  );
};

export default ImageUpload;

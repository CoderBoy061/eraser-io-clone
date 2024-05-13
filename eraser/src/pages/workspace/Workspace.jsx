import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import Warning from "@editorjs/warning";
import SimpleImage from "@editorjs/simple-image";
import LinkTool from "@editorjs/link";
import { toast } from "sonner";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleFileFunc,
  updateFileUrlFunc,
} from "@/redux/actions/file.action";
import { useParams } from "react-router-dom";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

const Workspace = () => {
  const ref = useRef(null);
  const [whiteBoardData, setWhiteBoardData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const dispatch = useDispatch();
  //taking the teamId and the fileId from the url params
  const { teamId, fileId } = useParams();
  //fetching the single file data so that we can initialize the editor with the data or the canvas with the data
  useEffect(() => {
    dispatch(getSingleFileFunc(fileId));
  }, [dispatch, fileId]);

  //getting the single file from the redux store
  const { singleFile } = useSelector((state) => state.file);
  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3, 4, 5, 6],
            classes: {
              h1: "ce-header ce-header--h1",
              h2: "ce-header ce-header--h2",
              h3: "ce-header ce-header--h3",
              h4: "ce-header ce-header--h4",
              h5: "ce-header ce-header--h5",
              h6: "ce-header ce-header--h6",
            },
          },
        },
        paragraph: Paragraph,
        list: List,
        checklist: Checklist,
        warning: Warning,
        image: SimpleImage,
        link: LinkTool,
      },
      data: singleFile?.document
        ? JSON.parse(singleFile?.document)
        : rawDocument,
    });
    ref.current = editor;
  };

  //useEffect to initialize the editor
  useEffect(() => {
    initializeEditor();
    // Clean up function to destroy the editor instance when the component unmounts
    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, []);

  // Function to save the data to the file
  const saveDataToFileFunction = async () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        setArticleData(outputData);
      });
    }
    if (articleData !== null || whiteBoardData !== null) {
      dispatch(updateFileUrlFunc(articleData, whiteBoardData, teamId, fileId));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
        saveDataToFileFunction();
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, [articleData, whiteBoardData]);
  

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 bg-white h-screen ml-5">
        <div id="editorjs"></div>
      </div>
      <div className="col-span-9 ">
        <Excalidraw
          initialData={{
            elements: singleFile?.draw && JSON.parse(singleFile?.draw),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
            },
          }}
        >
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      </div>
    </div>
  );
};

export default Workspace;

#!/bin/bash
select opt in "add_faces" "record" "run" "exit"
do
    case $opt in
        "add_faces")
            python3 add_faces.py
            ;;
        "record")
            echo "open index.html"
            # python3 converter.py
            # ./index.html
            # python3 -m streamlit run app.py
            ;;
        "run")
            python3 test.py
            ;;
        "exit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
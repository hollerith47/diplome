import {Search, SearchIconWrapper, StyledInputBase} from "./Search";
import {MagnifyingGlass} from "phosphor-react";
import React from "react";
import {Stack} from "@mui/material";

const SearchBar = ({setSearchTerm, isDialog}) => {
    return (
        <Stack sx={{flexGrow: 1}}>
            <Search bgColor={isDialog ? "#EAF2FE" : ""}>
                <SearchIconWrapper>
                    <MagnifyingGlass color="#709CE6"/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Поиск…"
                    inputProps={{"aria-label": "search"}}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Search>
        </Stack>
    );
};


export default SearchBar;

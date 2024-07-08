import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetchPosts } from "./queryFn";

"use client";

import React from "react";
import {
    ModalDialog,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalDescription
} from "./modal-dialog";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface GetStartedModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function GetStartedModal({ open, onOpenChange }: GetStartedModalProps) {
    return (
        <ModalDialog open={open} onOpenChange={onOpenChange}>
            <ModalContent className="max-w-md p-0 overflow-hidden border-zinc-800 bg-zinc-950">
                <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                    {/* Logo Section */}
                    <div className="mb-6 sm:mb-8 mt-2 sm:mt-4 w-full flex flex-col items-center">
                        <div className="flex gap-1 items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded-sm bg-white animate-pulse" />
                            <div className="w-3.5 h-3.5 rounded-sm bg-zinc-500" />
                            <div className="w-3.5 h-3.5 rounded-sm bg-zinc-700" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mt-3 sm:mt-4 italic">ZenBlocks</h1>
                    </div>

                    <ModalHeader className="p-0 mb-6 sm:mb-8">
                        <ModalTitle className="text-zinc-200 text-base sm:text-lg font-medium text-center justify-center leading-relaxed">
                            To use ZenBlocks you must log into an existing account or create one using one of the options below
                        </ModalTitle>
                    </ModalHeader>

                    <div className="w-full space-y-2.5 sm:space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-11 sm:h-12 bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all rounded-xl gap-3 text-sm sm:text-base font-semibold"
                        >
                            <GoogleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            Sign in with Google
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-11 sm:h-12 bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all rounded-xl gap-3 text-sm sm:text-base font-semibold"
                        >
                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                            Sign in with GitHub
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-11 sm:h-12 bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all rounded-xl gap-3 text-sm sm:text-base font-semibold"
                        >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            Sign in with email and password
                        </Button>
                    </div>

                    <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-zinc-500 max-w-[280px]">
                        By signing in, you accept the{" "}
                        <a href="/terms" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                            Terms of Service
                        </a>{" "}
                        and acknowledge our{" "}
                        <a href="/privacy" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                            Privacy Policy
                        </a>.
                    </div>
                </div>
            </ModalContent>
        </ModalDialog>
    );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="currentColor"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
            />
            <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    );
}

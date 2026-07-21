from __future__ import annotations

import logging
import sys


_LOGGER_INITIALIZED = False


def configure_logging(level: int = logging.INFO) -> None:
    """
    Configure application logging.

    Safe to call multiple times.
    """

    global _LOGGER_INITIALIZED

    if _LOGGER_INITIALIZED:
        return

    formatter = logging.Formatter(
        fmt=(
            "%(asctime)s | "
            "%(levelname)-8s | "
            "%(name)s | "
            "%(message)s"
        ),
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)

    root_logger = logging.getLogger()

    root_logger.setLevel(level)
    root_logger.addHandler(console_handler)

    _LOGGER_INITIALIZED = True


def get_logger(name: str) -> logging.Logger:
    """
    Return a configured logger.
    """

    configure_logging()

    return logging.getLogger(name)
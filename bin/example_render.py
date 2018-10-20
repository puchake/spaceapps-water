""" This is an example script meant to demonstrate how jinja2 works. """

import argparse

import jinja2


def parse_args():
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("--template_path", type=str, required=True)
    arg_parser.add_argument("--output_path", type=str, required=True)
    return arg_parser.parse_args()


if __name__ == "__main__":
    args = parse_args()

    with open(args.template_path) as file:
        template_content = file.read()

    template = jinja2.Template(template_content)
    rendered_content = template.render(example_string="AuAuu")

    with open(args.output_path, "w") as file:
        file.write(rendered_content)

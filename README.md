# spaceapps-water

## Setup

### Setup virtualenv

#### Install 

Clone the repository and cd into `spaceapps-water` directory. Run:

`python -m venv .venv`

or:

`python3 -m venv .venv`

(depends on which one is your python3 installation).

#### Activate

Activate virtual env with command (_pay attention to slashes direction_):

* Windows: `.\.venv\Scripts\activate.bat`
* Linux: `source .venv/bin/activate`

#### Setup in PyCharm

Go to `File > Settings`, type in the search prompt `Interpreter` and add your 
newly created venv as current project interpreter.

### Install requirements

After activating the venv run:

`(.venv) ... > pip install -r requirements.txt`

### Run example render

Run:

`python path/to/example_render.py --template_path path/to/example_template.html --output_path path/to/example_out.html`

or fill in script params in PyCharm run config for example_render.py
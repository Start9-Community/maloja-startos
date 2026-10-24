ARG IMAGE
FROM ${IMAGE}
RUN /venv/bin/python -m pip install --no-cache-dir --upgrade --root-user-action=ignore 'certifi>=2026.10.19' \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr "$(/venv/bin/python -m certifi)"

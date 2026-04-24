"""add rooms and room members tables

Revision ID: 20e079422b96
Revises: a300868fae3f
Create Date: 2026-04-24 17:18:48.203134

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '20e079422b96'
down_revision: Union[str, Sequence[str], None] = 'a300868fae3f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'rooms',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('created_by', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_rooms_id'), 'rooms', ['id'], unique=False)

    op.create_table(
        'room_members',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('room_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['room_id'], ['rooms.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_room_members_id'), 'room_members', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_room_members_id'), table_name='room_members')
    op.drop_table('room_members')
    op.drop_index(op.f('ix_rooms_id'), table_name='rooms')
    op.drop_table('rooms')
